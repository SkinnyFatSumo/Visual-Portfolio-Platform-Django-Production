# from .permissions import IsOwnerOrReadOnly
# from .serializers import PhotoSerializer


from rest_framework import generics, permissions
from rest_framework.permissions import AllowAny
from .models import Photo, Tag, PhotoWithTag
from .serializers import PhotoSerializer, TagSerializer, PhotoWithTagSerializer


# Add photos and list all photos, url @ /photos/upload
class PhotoListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = (AllowAny,)
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    # permission_classes  = [permissions.IsAuthenticatedOrReadOnly]

    # def perform_create(self, serializer):
        # serializer.save(user=self.request.user)
    # Permission and user stuff only when you add users to associate


# Retrieve a specific photos, url @ /photos/<int:pk>
class PhotoRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    # permission_classes  = [IsOwnerOrReadOnly]


# Get only photos that contain ALL tags received
class PhotoListByTagAPIView(generics.ListAPIView):
    # ultimately we want to pull instances of photos
    serializer_class = PhotoSerializer

    def get_queryset(self):
        # pull all tag names listed in url following '?tags='
        url_tags = self.request.query_params.get('tags')

        # full sets
        all_relations = PhotoWithTag.objects.all()
        all_photos = Photo.objects.all()
       
        # filtered sets
        filt_photos = all_photos
        filt_relations = all_relations


        # append tags to list (they are comma separated)
        tag_list = url_tags.split(',')

        # if any tags exist, cycle through them to filter relations & photos
        if url_tags == '':
            queryset = all_photos
        else:
            for current_tag in tag_list:
                # from the remaining relationships (starting with all of them)
                # get relationships whose related tag = the current tagname in list
                filt_relations = filt_relations.filter(tag__tagname=current_tag)
                # from the photos that remain
                # get photos that have a relationship 
                # based on the tag in the remaining relationships
                filt_photos = filt_photos.filter(related_photos__in=filt_relations)
                # the remaining relationship are all relationships contained
                # by the remaining photos
                filt_relations = all_relations.filter(photo__id__in=filt_photos)
       
            # return all distinct photos who have relations with all the tags
            queryset = filt_photos.filter(related_photos__in=filt_relations).distinct()
        
        return queryset

        # i think you should order the tag names in url in ascending
        # alphabetical order to make sure the same url always leads to
        # the same endpoint. could this help with caching?
        # !!!! THIS WOULD HAPPEN PRIOR TO BEING PASSED AS URL INFO


# Add tags and list all available tags
class TagListCreateAPIView(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer 

# Destroy a tag
class TagRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    lookup_field = "tagname" 


# Add relationship and list all relationshipsj 
class PhotoWithTagListCreateAPIView(generics.ListCreateAPIView):
    queryset = PhotoWithTag.objects.all()
    serializer_class = PhotoWithTagSerializer

# Destroy a tag
class PhotoWithTagRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PhotoWithTag.objects.all()
    serializer_class = PhotoWithTagSerializer


