## Video club with checkout

Video club with checkout is a simple crud web app search for movies and add to checkout cart using React.
## Build With

* [React](https://reactjs.org/)
* [Material UI](https://material-ui.com/)
* [Create-react-app with Typescript template](https://create-react-app.dev/docs/adding-typescript/)
* [React hot toast](https://github.com/timolins/react-hot-toast)
* [Typescript](https://www.typescriptlang.org/docs/handbook/react.html)
* [Axios](https://github.com/axios/axios)

### How to run 

```
git clone videoclub-checkout
cd videoclub-checkout
Create on the root folder a .env file and put inside our env var for API Endpoint and our API KEY 
```

* **Use your own KEY else ask the auth to provide you one. (e.g REACT_APP_API_KEY="YOUR_KEY")**
* **The api endpoint. (REACT_APP_API_ENDPOINT="https://developers.themoviedb.org/3")**

After the first step continue with our main set up and the installation of our modules.

```
npm install
npm run start
```

### Features implemented
* Search field with on change search action (Debounce used here)
* Add movies in cart
* Remove movie from cart or from movies list
* Show details of movie by click the specific button
* Make checkout on cart
* Clear cart from selected movies
* Pagination for movies based on api response for movies per page (25 fixed)
* Sort by "Highest vote average" or "Lowest vote average"

### Testing build with

* [Jest for React](https://jestjs.io/)
* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
* [Axios mock adapter](https://github.com/ctimmerm/axios-mock-adapter#readme)

### Testing

For testing i have used jest framework together with enzyme to render components.
To run the test type:

```
npm test
```

To run test with coverage run:

```
npm test -- --coverage
```

