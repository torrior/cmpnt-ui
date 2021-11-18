# COMPENT.IO UI/UX components and FAQ

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.12.

## Development server

Run `ng serve` or `ng serve --open` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `docs/` directory. Use the `ng build --configuration=production` flag for a production build.

Run `ng build --configuration=production --base-href=/cmpnt-ui/` for build production build for deploy with base-href.

## Used libraries
*  [Angular Material v12](https://v12.material.angular.io/)
*  [Transloco](https://ngneat.github.io/transloco/)
*  [Flex layout](https://github.com/angular/flex-layout)
---

### Using Transloco for translation

Start by installing the Transloco library from `ng`

`ng add @ngneat/transloco`

Next, it will create a new file, transloco-root.module.ts which exposes an Angular's module with a default configuration, and inject it into the AppModule.

You should import the TranslocoRootModule once in your root module, and use TranslocoModule in any other module.

### Using Angular Flex Layout

Start by installing the Angular Layout library from `npm`

`npm i -s @angular/flex-layout`

Next, you'll need to import the Layout module in your app's module.

**app.module.ts**

```ts
import { FlexLayoutModule } from '@angular/flex-layout';
...
@NgModule({
    ...
    imports: [ FlexLayoutModule ],
    ...
});
```

After that is configured, you can use the Angular Layout attributes in your HTML tags for flex layout:
```html
<div fxLayout="row" fxLayoutAlign="space-between">
</div>
```

Check out [all of the available options](https://github.com/angular/flex-layout/wiki/Declarative-API-Overview) for using Angular Layout in your application.

---

### Quick Links

*  [Flex layout ChangeLog](https://github.com/angular/flex-layout/blob/master/CHANGELOG.md)
*  [Flex layout Wiki Documentation](https://github.com/angular/flex-layout/wiki)
*  [All about Flex layout](https://flexbox.malven.co/)
*  [Transloco FAQ](https://ngneat.github.io/transloco/docs/faq)
---


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
