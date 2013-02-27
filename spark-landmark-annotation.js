if (Meteor.isClient) {

  function htmlFunc () {
    // make reactive
    var title = Session.get("title");

    return [
      "<h1>",
      title,
      "</h1>"
    ].join("");
  }

  function template () {

    var landmarkOptions = {
      preserve: ['h1'],

      created: function () {
        console.log("created", this, arguments);
      },

      rendered: function () {
        console.log("rendered", this, arguments);
      },

      destroyed: function () {
        console.log("destroyed", this, arguments);
      }
    };

    var onLandmark = function (landmark) {
      return Spark.isolate(htmlFunc);
    };

    return Spark.createLandmark(landmarkOptions, onLandmark);
  }

  function showTemplateAnnotations () {
    var r = new Spark._Renderer;
    var annotations = Spark._currentRenderer.withValue(r, template);
    console.log("Annotated Html:");
    console.log(annotations);
  }

  function renderTemplateToBody () {
    Session.set("title", 
      "It's a bird.. it's a plane.. it's a Landmark!"
    );

    document.body.appendChild(Spark.render(template));
  }

  Meteor.startup(renderTemplateToBody);
  //Meteor.startup(showTemplateAnnotations);
}
