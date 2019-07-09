import os.path
from io import BytesIO
from django.core.files.base import ContentFile

from django.db import models
from django.conf import settings
from .permissions import IsOwnerOrReadOnly

from django.utils.timezone import now
from PIL import Image
from django_boto.s3.storage import S3Storage
s3 = S3Storage()


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
    return 'photos/%s/%s/%s/%s/' % (
        now().strftime("%Y%m%d"), instance.owner.lower(), instance.title.lower(), filename_ext.lower(),
    )

# Create PHOTO (that can be associated with tags)
class Photo(models.Model):

    title = models.CharField(max_length=50)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='photos', on_delete=models.CASCADE)

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

    # referential info
    uploaded = models.DateTimeField(auto_now_add=True)
    

    
    photo_source = models.URLField(max_length=300)
    thumbnail_source = models.URLField(max_length=300)
    thumbnail_height = models.SmallIntegerField()
    thumbnail_width = models.SmallIntegerField()
    
    photo = models.ImageField(upload_to=upload_photo_to, storage=s3, null=True, blank=True)
    thumb = models.ImageField(upload_to=upload_photo_to, storage=s3, null=True, blank=True)


    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.create_thumbnail():
            raise Exception('Could not create thumbnail, check file type')
        super(Photo, self).save(*args, **kwargs)
    


    def create_thumbnail(self):
        try:
            image = Image.open(self.photo)
        except:
            raise Exception('Failed to open full res image')
            return False
        
        size = (700, 700)
        image.thumbnail(size, Image.ANTIALIAS)

        thumb_base, thumb_ext = os.path.splitext(self.photo)
        thumb_ext = thumb_ext.lower()
        thumb_file_path = thumb_base + '_thumb' + thumb_ext

        if thumb_ext in ['.jpg', '.jpeg']:
            FTYPE = 'JPEG'
        elif thumb_ext in ['.tif', '.tiff']:
            FTYPE = 'TIFF'
        elif thumb_ext == '.png':
            FTYPE = 'PNG'
        elif thumb_ext == '.gif':
            FTYPE = 'GIF'
        else:
            raise Exception('unsupported file type')
            return False

        # SAVE THUMBNAIL TO IN-MEMORY FILE
        temp_thumb = BytesIO()
        image.save(temp_thumb, FTYPE)
        temp_thumb.seek(0)

        # TODO: handle deleting old files from s3 when new values are added

        # set save to False to escape infinite loop
        self.thumb.save(thumb_file_path, ContentFile(temp_thumb.read()), save=False)
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
    







