# E-Commerce App (Flutter)

A Flutter shopping app with Firebase accounts, a product catalog, a cart with discounts, and one-to-one chat between
users. Built for Advanced Mobile Programming (A.Y. 2026–2027) at National University Manila, one lab activity per branch.

## Screenshots

TODO(rafael): add screenshots (sign in, products, product details, cart, chat, settings).

## Features

- Sign up / sign in with Firebase Authentication; edit profile, change password, delete account
- Product catalog and product details from the DummyJSON API
- Cart with per-product discount totals (covered by a unit test in `test/cart_logic_test.dart`)
- One-to-one chat stored in Cloud Firestore
- Firestore security rules: users can only write their own profile, and only the two people in a chat can read it
- Light/dark theme setting

## Tech stack

Flutter / Dart · Firebase Auth · Cloud Firestore · Provider · http · flutter_dotenv

## Run locally

```bash
cd marinas_advmobprog
flutter pub get
# assets/.env needs HOST=https://dummyjson.com
flutter run
```

You need your own Firebase project (`flutterfire configure`) for sign-in and chat.
On Windows, clone with `git clone -c core.longpaths=true …` because some iOS paths are long.

## My role

Solo coursework by Rafael Marinas.
