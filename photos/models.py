import os.path
from django.conf import settings

from django.db import models
from django.dispatch import receiver

from django.utils.timezone import now

from io import BytesIO
from PIL import Image
from storages.backends.s3boto import S3BotoStorage
s3 = S3BotoStorage(location='')


# Create TAG (that can be associated with photos)
class Tag(models.Model):
    # GET RID OF UNIQUE = TRUE, BECAUSE DIFFERENT OWNERS NEED TO BE ABLE TO SHARE A TAG
    tagname = models.SlugField(max_length=50)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='tags', on_delete=models.CASCADE)

    def __str__(self):
        return self.tagname

    class Meta:
        ordering = ['tagname']
        unique_together = ('owner', 'tagname',)



def upload_photo_to(instance, filename):
    filename_base, filename_ext = os.path.splitext(filename)
    return 'photos/%s/%s/' % (
        instance.owner.username.lower(), instance.title.lower() + '--' + now().strftime("%Y%m%d") + filename_ext.lower(),
    )

def upload_thumb_to(instance, filename):
    filename_base, filename_ext = os.path.splitext(filename)
    return 'thumbnails/%s/%s/' % (
        instance.owner.username.lower(), instance.title.lower() + '--' + now().strftime("%Y%m%d") + filename_ext.lower(),
    )

# Create PHOTO (that can be associated with tags)
class Photo(models.Model):

    ''' REQUIRED INFO ''' 
    title = models.CharField(max_length=50)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='photos', on_delete=models.CASCADE)
    photo_source = models.ImageField(upload_to=upload_photo_to, storage=s3)

    ''' AUTO-GENERATED INFO '''
    thumbnail_source = models.ImageField(
            upload_to=upload_thumb_to, storage=s3, height_field='thumbnail_height', 
            width_field='thumbnail_width', null=True, blank=True)
    thumbnail_height = models.SmallIntegerField(blank=True, null=True)
    thumbnail_width = models.SmallIntegerField(blank=True, null=True)
    uploaded = models.DateTimeField(auto_now_add=True)

    ''' OPTIONAL INFO '''
    # color/bw & film/digital
    color = models.BooleanField(blank=True, null=True)
    film = models.BooleanField(blank=True, null=True)

    # film info
    film_comp = models.CharField(max_length=50, blank=True, null=True)
    film_stock = models.CharField(max_length=50, blank=True, null=True)

    # shot info
    iso = models.SmallIntegerField(blank=True, null=True)
    aperture = models.DecimalField(max_digits=4, decimal_places=1, blank=True, null=True)
    shutter = models.DecimalField(max_digits=8, decimal_places=4, blank=True, null=True)
    focal_length = models.SmallIntegerField(blank=True, null=True)

   # gear info
    aspect_ratio = models.CharField(max_length=50, blank=True, null=True)
    camera_brand = models.CharField(max_length=100, blank=True, null=True)
    camera_model = models.CharField(max_length=100, blank=True, null=True)
    lens_brand = models.CharField(max_length=100, blank=True, null=True)
    lens_model = models.CharField(max_length=100, blank=True, null=True)

    # location & time info
    country = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    site = models.CharField(max_length=100, blank=True, null=True)
    taken = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        # Insure that a thumbnail is created on file save
        if not self.create_thumbnail():
            raise Exception('Could not create thumbnail, check file type')
        super(Photo, self).save(*args, **kwargs)


    def create_thumbnail(self):
        try:
            image = Image.open(self.photo_source)
        except:
            raise Exception('Failed to open full res image')
            return False
     
        # Handle orientation exif data if found
        try:
            if hasattr(image, '_getexif'): # only present in JPEGs
                for orientation in ExifTags.TAGS.keys(): 
                    if ExifTags.TAGS[orientation]=='Orientation':
                        break 
                e = image._getexif()       # returns None if no EXIF data
                if e is not None:
                    exif=dict(e.items())
                    orientation = exif[orientation] 

                    if orientation == 3:   image = image.transpose(Image.ROTATE_180)
                    elif orientation == 6: image = image.transpose(Image.ROTATE_270)
                    elif orientation == 8: image = image.transpose(Image.ROTATE_90)

        except:
            raise Exception('Failure while checking exif data.')
            return False
        

        # resize image to max 700px on longest side
        size = (700, 700)
        image.thumbnail(size, Image.ANTIALIAS)

        thumb_base, thumb_ext = os.path.splitext(self.photo_source.name)
        thumb_ext = thumb_ext.lower()
        thumb_file_path = thumb_base + '_thumb' + thumb_ext


        if thumb_ext in ['.jpg', '.jpeg']:
            FTYPE = "JPEG"
        elif thumb_ext in ['.tif', '.tiff']:
            FTYPE = "TIFF"
        elif thumb_ext == '.png':
            FTYPE = "PNG"
        elif thumb_ext == '.gif':
            FTYPE = "GIF"
        else:
            raise Exception('unsupported file type')
            return False

        # SAVE THUMBNAIL TO IN-MEMORY FILE
        temp_thumb = BytesIO()
        image.save(temp_thumb, format=FTYPE)
        temp_thumb.seek(0)

        # set save to False to escape infinite loop
        self.thumbnail_source.save(thumb_file_path, temp_thumb, save=False)
        temp_thumb.close()

        return True

    class Meta:
        ordering = ['taken']
        unique_together = ('owner','title',)


# Use for many-to-many relationship between tags and photos
class PhotoWithTag(models.Model):
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, related_name='related_photos')
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, related_name='related_tags')
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='relations', on_delete=models.CASCADE)

    def __str__(self):
        return 'photo: ' + self.photo.title + ' --- tag: ' + self.tag.tagname
    

# TODO: create reciever to clean up when a photo is updated/altered

# Delete photos from S3 storage AFTER instance is deleted from database
@receiver(models.signals.post_delete, sender=Photo)
def remove_file_from_s3(sender, instance, using, **kwargs):
    instance.photo_source.delete(save=False)
    instance.thumbnail_source.delete(save=False)




