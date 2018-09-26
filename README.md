`cd frontend`

`npm install`

**angular set up ho jayega

Create local_settings.py and type:

```
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

DEBUG = True

```



Now do
`python manage.py makemigrations`

`python manage.py migrate`




In future if you edit anything in angular then do:

`sh rebuild.sh`

Then again do python manage.py runserver

