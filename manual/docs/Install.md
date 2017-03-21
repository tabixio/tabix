### Variant 1, Hosted

Not need install

* Master branch : http://ui.tabix.io
* Beta branch : http://beta.tabix.io

### Variant 2, Local

* git clone https://github.com/smi2/tabix.ui
* nginx root_path to build path
* done


### Variant 3, Embedded


```html
<!doctype html>
<html ng-app="SMI2">
    <head>
        <meta charset="utf-8">
        <title>Tabix.io by SMI2</title>
        <meta name="viewport" content="width=device-width">
        <base href="/">
        <link rel="stylesheet" href="//ui.tabix.io/styles/app.css">
    </head>
    <body>
        <div ui-view="" class="content-ui"></div>
        <script src="//ui.tabix.io/scripts/app.js"></script>
    </body>
</html>
```

### Variant 4, compile from source

See develop page



