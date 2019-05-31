# from .permissions import IsOwnerOrReadOnly
# from .serializers import PhotoSerializer

from rest_framework import generics, permissions
from .permissions import (IsOwnerOrReadOnly,)
from rest_framework.permissions import AllowAny
from .models import Photo, Tag, PhotoWithTag
from .serializers import PhotoSerializer, TagSerializer, PhotoWithTagSerializer
from django.db.models import Count


'''PHOTO'''
# List all photos owned by a specific user
class PhotoListAPIView(generics.ListAPIView):
    serializer_class = PhotoSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        return Photo.objects.filter(owner__username=username)


# Add a new photo owned by this user
class PhotoCreateAPIView(generics.CreateAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# Retrieve a specific photos, url @ /photos/<int:pk>
class PhotoRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes  = [permissions.IsAuthenticated]


'''PHOTO BY TAG'''
# Get only photos that contain ALL tags received
class PhotoListByTagAPIView(generics.ListAPIView):
    # ultimately we want to pull instances of photos
    serializer_class = PhotoSerializer

    def get_queryset(self):
        # get username from url
        username = self.kwargs['username']

        # pull all tag names listed in url following '?tags='
        url_tags = self.request.query_params.get('tags')

        # full sets
        all_relations = PhotoWithTag.objects.filter(owner__username=username)
        all_photos = Photo.objects.filter(owner__username=username)
       
        # filtered sets
        filt_photos = all_photos
        filt_relations = all_relations


        # append tags to list (they are comma separated)
        tag_list = url_tags.split(',')

        '''
        possible fix for slow queries: get all relations that have one of the
        tags in the url list
        count the occurence of each photo in that list of relations
        only return photos with as many occurences as tags listed
        '''
        # if any tags exist, cycle through them to filter relations & photos
        if url_tags == '':
            queryset = Photo.objects.filter(owner__username=username)
        else:

            photo_list = PhotoWithTag.objects.filter(owner__username=username).filter(tag__tagname__in=(tag_list)).values('photo', 'owner').annotate(total=Count('photo')).filter(total=len(tag_list))

            my_photos = []
            for photo_dict in photo_list:
                my_photos.append(photo_dict['photo'])

            queryset = Photo.objects.filter(pk__in=my_photos)

            '''
            all_related_photos = Photo.objects.filter(owner__username=username).filter(related_photos__tag__tagname__in=tag_list))

            reduced_photos = all_relation_photos.values('title').annotate(total=Count('title')).filter(total=len(tag_list))
           ''' 


                    
        # in=(PhotoWithTag.objects.filter(owner__username=username).filter(tag__tagname__in=url_tags)))
        print(queryset)
        return queryset
        '''
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
        '''

        # i think you should order the tag names in url in ascending
        # alphabetical order to make sure the same url always leads to
        # the same endpoint. could this help with caching?
        # !!!! THIS WOULD HAPPEN PRIOR TO BEING PASSED AS URL INFO


'''TAG'''
# Add tags and list all available tags
class TagListAPIView(generics.ListAPIView):
    serializer_class = TagSerializer 
    
    def get_queryset(self):
        username = self.kwargs['username']
        return Tag.objects.filter(owner__username=username)

# Add tags and list all available tags
class TagCreateAPIView(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer 
    permission_classes = [ permissions.IsAuthenticated ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# Retrieve, Update, or Destroy a Tag
class TagRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    lookup_field = "tagname" 
    permission_classes = [ permissions.IsAuthenticated ]


'''PHOTO WITH TAG'''
# Add relationship and list all relationshipsj 
class PhotoWithTagListAPIView(generics.ListAPIView):
    serializer_class = PhotoWithTagSerializer
    
    def get_queryset(self):
        username = self.kwargs['username']
        return PhotoWithTag.objects.filter(owner__username=username)
    

# Add relationship and list all relationshipsj 
class PhotoWithTagCreateAPIView(generics.ListCreateAPIView):
    queryset = PhotoWithTag.objects.all()
    serializer_class = PhotoWithTagSerializer
    permission_classes = [ permissions.IsAuthenticated ]
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# Retrieve, Update, or Destroy a relation
class PhotoWithTagRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PhotoWithTag.objects.all()
    serializer_class = PhotoWithTagSerializer
    permission_classes = [ permissions.IsAuthenticated ]
