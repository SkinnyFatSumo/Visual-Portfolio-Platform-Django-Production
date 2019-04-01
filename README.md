# Visual-Portfolio-Platform

VERY MUCH STILL IN PROGRESS!

-------------------------------------------------------------------

This project aims to create a portfolio platform for visual artists, especially photographers. Easy to search and sort, it's a tool for both creators and their audiences.

This stack combines Django (w/ Django Rest Framework) and React. The goal is the best of both worlds: the speed and smoothness of an SPA with a robust backend framework.

Dynamically defined routes means your navigation always correlates with your content. Routes are stable and can be entered directly via the browser or refreshed.

Tags can be created, assigned, unassigned, and deleted, and the changes will be enforced globally.

-------------------------------------------------------------------

As of now content can only be created, deleted, and updated via the django admin panel. After establishing the layout the first priority will be implementing full CRUD. Also there is no concept of users, profiles, or authentication yet. Ideally you would be able to view other people's (public) content, and create your own collections with it. To move this concept from just an individual site to a platform is the next major hurdle, but still a ways off.

-------------------------------------------------------------------

Thanks and credit go out to:

Coding for Entrepreneurs and their Reactify-Django project for providing some insight into structuring the API. https://github.com/codingforentrepreneurs/Reactify-Django

Traversy Media and his very helpful tutorials. 
https://www.traversymedia.com/

Sandra for an incredible masonry photo gallery layout (which I have yet to implement, but will). 
https://github.com/neptunian 
https://github.com/neptunian/react-photo-gallery

-------------------------------------------------------------------

Libaries / Frameworks:

Django
Django Rest Framework
React
Redux
React Router
React Alert
