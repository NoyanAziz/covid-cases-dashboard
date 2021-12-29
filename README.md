# Covid Cases Dashboard Backend

#### This is the backend for covid19 cases dashboard which is built on th data from the following link:
####  https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series

## Setup
### Cloning the repo

#### Fork this repo and then clone it using the following command
#### `git clone https://github.com/<username>/<forked-repo>.git`

### Create your own virtual environment

#### Follow the following document to create your own virtual environment
#### https://docs.google.com/document/d/1QN5kTbLPfQPPVXLvzWWxDJhIsdLv7TmKR_Yk5LoInTc/edit?usp=sharing

### Install the dependancies

#### Run the following command in your terminal to install all the requirements for running this django project
#### `pip install -r requirements.txt`

### Create a new PostgreSQL database

#### Install postgres and pgadmin in your machine. Then run the following commands to create a database
#### `$ psql postgres`
#### `$ CREATE DATABASE databasename`
#### `$ \connect databasename`

### Setting up .env file

#### Add the following variables in your .env file
#### SECRET_KEY = <DJANO_KEY>
#### DB_USER = <YOUR_DB_USER>
#### DB_PASSWORD = <YOUR_DB_PASSWORD>

#### For generating a new django key refer to https://djecrety.ir/


## Running the Project

### Migrate tables from django models

#### `$ python manage.py makemigrations`
#### `$ python manage.py migrate`

### Run the server
#### `$ python manage.py runserver`
