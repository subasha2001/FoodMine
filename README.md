## lESSONS
1. Intro
2. Install development tools
3. Create Angular App
    1. Create projects's folder
    2. Install @angular/cli
    3. Create App as frontend
4. Add Header
    1. Generate Component
    2. Add HTML and Css
5. List Foods
    1. Create Food model
    2. Create data.ts and add sample foods
    3. Add images to assets
    4. Create Food service-
    5. Create Home Component
        1. Add ts
        2. Add Html
        3. Add css
6. Search
    1. Add method to Food service
    2. Add search route
    3. Show search result in Home component
    4. Generate search component
        1. Add to home component
        2. Add ts
        3. Add html
        4. Add css
7. Tags Bar
    1. Create Tag model
    2. Add sample tags to data.ts
    3. Food Service
        1. Add get all tags method
        2. Add get all foods by tag method
    4. Add tags route
    5. Show tag result in Home component
    6. Generate tags component
        1. Add to home component
        2. Add ts, html and css
8. Food Page
    1. Add method to food service
    2. Generate Food Page component
        1. Add Route
        2. Add html, css and ts
9. Cart Page
    1. Create CartItems Model
    2. Create Cart Model
    3. Generate Cart service
    4. Add to Cart Button in Food Page
    5. Generate Cart page component
        1. Add Route
        2. Add html, css and ts
10. Not Found!
    1. Generate compound
        1. Add ts, html and css
    2. Add to pages
        1. Home page
        2. Food page
        3. Cart page
11. Connect to Backend
    1. Create backend folder
    2. npm init
    3. npm install typescript
    4. create tsconfig.json
    5. Create .gitignore
    6. Copy data.ts to backend/src
    7. npm install express cors
    8. Create server.ts
        1. install @types
        2. Add Apis
    9. npm install nodemon ts-node --save-dev
    10. Add urs.ts to frontend
    11. Add HttpClient module
    12. Update food service
12. Login Page
    1. Generate Component
        1. Add routes
        2. Add ts, html reactive forms and css
    2. Add Login Api
        1. Use Json
        2. Add jsonwebtoken
        3. Test Using Postman
    3. Generate User Service
        1. Generate User Model
        2. Add User Subject
        3. Add Login Method
            1. Add Users Url
            2. Generate UserLogin Interface
            3. Add ngx-toaster
                1. Import modules
                2. Import BrowesrAnimationModules
                3. Add styles in angular.json
        4. Add to header
    1. Add Local Storage Methods
    2. Add Logout Method
        1. Add to Header
13. Make Components for Login Page
    1. Input Container
    2. Input Validation
    3. Text Input
    4. Default Button
14. Connect Login Api to MongoDB Atlas
    1. Moving Apis into routers
    2. Create MongoDB Atlas
    3. Create .env file
    4. Install   //we are creating these for .env file
        1. mongoose  //for creating models, we cannot directly access mongodb
        2. dotenv
        3. dcryptjs //for saving passwords into db, indirectly saving
        4. express-async-handler
    5. Connect to MongoDB Atlas
    6. Use MongoDB instead of data.ts in apis
15. Register User
    1. Add Register api
    2. Add Register service method
    3. Add Register link
    4. Add Register Component
16. Loading!
    1. Add Image
    2. Add Component
    3. Add Service
    4. Add Interceptor
17. Checkout Page
    1. Create Order Model
    2. Create Checkout Page Component, add router
    3. Add User to User Service
    4. Add Cart to Cart Service
    5. Create Order Items List Component
    6. Adding Map to the Checkout Page
        1. Add Leaflet npm package
            1. Add @types/leaflet
            2. Add Css to angular.json
        2. Add AddressLatLng to Order Model
        3. Create Map component
            1. Add to checkout page
            2. Add TS
                1. Change app-map selector to map
            3. Add Html
            4. Add CSS
        4. Add Auth Guard
    7. Save Order
        1. Add Order Model
        2. Add Order Status Enum
        3. Add Auth Middleware
        4. Add Order Router
            1. Add create Api
        5. Add Order Urls to urls.ts
        6. Add Order Service
            1. Add create Method
        7. Add Auth Interceptor
18. Payment Page
    1. Generate Component
    2. Add 'getOrderForCurrentUser' api
    3. Add Order Service method
    4. Connect Component to service
    5. Make the map component readonly
19. Adding Paypal
    1. Generate Component
        1. Add to payment page
    2. Get Paypal client Id
    3. Add Paypal JS to index.html
    4. Set up Paypal button
    5. Add Pay upi to order router
    6. Get Paypal sandbox account
20. Order Track Page
    1. Generate Component and add routes
    2. Add Api and add to urls.ts
    3. Add method to order.service
    4. Add html and css