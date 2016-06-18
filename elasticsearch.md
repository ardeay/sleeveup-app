# Installing elastic search documenation

Elastic search

```brew install elasticsearch```

Install Heroku toolbelt https://toolbelt.heroku.com/

```Follow steps on the toolbelt homepage```


Install search box addon https://devcenter.heroku.com/articles/searchbox

```heroku addons:create searchbox --app sleeveup```

Check for SEARCHBOX_URL and SEARCHBOC_SSL_URL are installed to config

```heroku config --app sleeveup```

Elastic search dependency is added to package.json

```"elasticsearch": ">=1.1.0"```