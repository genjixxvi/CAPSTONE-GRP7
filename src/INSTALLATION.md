# SETUP AND INSTALLATION

## Front-End directory: <u>CAPSTONE-PROJECT.

1. Navigate to CAPSTONE-PROJECT

```
cd CAPSTONE-PROJECT
```

2. Install dependencies
```
npm install
```

3. Run the app

```
npm start
```

4. Open the project

```
localhost:5173
```

## Admin directory: <u>KH-ADMIN.

1. Navigate to KH-ADMIN

```
cd KH-ADMIN
```

2. Install dependencies
```
npm install
```

3. Run the app

```
npm start
```

4. Open the project

```
localhost:3000
```

## Back-End directory: <u>CAPS-PROJ-BACK-END.

1. Navigate to CAPS-PROJ-BACK-END

```
cd CAPS-PROJ-BACK-END
```

2. Install dependencies
```
composer install
```

3. Create Environmental File (copy the .env.example file to .env)

```
cp .env.example .env
```

4. Generate Application Key

```
php artisan key:generate
```

5. Setup Database

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=<database_name>
DB_USERNAME=<database_username>
DB_PASSWORD=<database_password>
```

6. Run migrations

```
php artisan migrate
```

7. Run the app
```
php artisan serve
```