// Generated by CoffeeScript 1.10.0
(function() {
  var build_gallery, build_info, build_pups, build_video, build_web, check_time, circleGeometry, cities, close_menu, date, ellipsoid, fly_to_Russia, geodata, get_oopt_rect, handler, is_globus_moved, is_photo_enable, is_video_enable, load_borders, load_cities, load_geodata, load_np, load_popups_data, load_zp, num_images, oopt, open_info_popup, open_menu, open_photo_popup, open_video_popup, open_web_popup, pole_primitive, popups_data, prepare_popup, primitives, redCircleInstance, scene, selected_polygon_name, showed_image, viewer;

  geodata = [
    {
      name: "np",
      path: "ndata/dv/np-dv.topojson",
      color: "#d8b366"
    }, {
      name: "zp",
      path: "ndata/dv/zp-dv.topojson",
      color: "#7ab342"
    }
  ];

  viewer = new Cesium.Viewer('cesiumContainer', {
    timeline: false,
    baseLayerPicker: false,
    infoBox: false,
    navigationHelpButton: false,
    geocoder: false,
    animation: false,
    scene3DOnly: true,
    fullscreenButton: false,
    imageryProvider: new Cesium.BingMapsImageryProvider({
      url: 'http://dev.virtualearth.net',
      key: 'Ail9PAst_7-T0BfqYAZjK4fVngfHJ3Fjg_ckK6eX8ro_xXwH2HcYUr_cJVDanhTV',
      maximumLevel: 500,
      mapStyle: Cesium.BingMapsStyle.AERIAL_WITH_LABELS
    })
  });

  circleGeometry = new Cesium.CircleGeometry({
    center: Cesium.Cartesian3.fromDegrees(90.0, 90.0),
    radius: 560000.0,
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
  });

  redCircleInstance = new Cesium.GeometryInstance({
    geometry: circleGeometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(0.71, 0.816, 0.816, 1))
    }
  });

  pole_primitive = new Cesium.Primitive({
    geometryInstances: [redCircleInstance],
    appearance: new Cesium.PerInstanceColorAppearance({
      closed: true
    })
  });

  pole_primitive.show = false;

  viewer.scene.primitives.add(pole_primitive);

  scene = viewer.scene;

  primitives = scene.primitives;

  oopt = {};

  popups_data = [];

  selected_polygon_name = '';

  $('.fullscreen_btn').click(function() {
    if ($.fullscreen.isFullScreen()) {
      $.fullscreen.exit();
    } else {
      $('body').fullscreen();
    }
    return false;
  });

  viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function(commandInfo) {
    fly_to_Russia();
    return commandInfo.cancel = true;
  });

  fly_to_Russia = function() {
    return scene.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(85, 60, 10000000.0),
      duration: 3
    });
  };

  scene.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(85, 60, 10000000.0),
    duration: 0
  });

  load_geodata = function() {
    var dataSource, data_item, j, len, results;
    results = [];
    for (j = 0, len = geodata.length; j < len; j++) {
      data_item = geodata[j];
      dataSource = new Cesium.GeoJsonDataSource();
      results.push(dataSource.load(data_item.path).then(function() {
        var entities, entity, k, len1, mat_property;
        viewer.dataSources.add(dataSource);
        entities = dataSource.entities.values;
        mat_property = new Cesium.ColorMaterialProperty(new Cesium.Color.fromCssColorString('rgba(208,177,125, .87)'));
        for (k = 0, len1 = entities.length; k < len1; k++) {
          entity = entities[k];
          if (entity.polygon) {
            entity.polygon.material = mat_property;
            entity.polygon.outline = new Cesium.ConstantProperty(false);
            entity.isNP = true;
            if (!oopt[entity.properties["Name_" + lang]]) {
              oopt[entity.properties["Name_" + lang]] = [];
            }
            oopt[entity.properties["Name_" + lang]].push(entity);
            oopt[entity.properties["Name_" + lang]]._id = entity.properties.ids_ID;
          }
        }
        return load_zp();
      }));
    }
    return results;
  };

  load_np = function() {
    var dataSource;
    dataSource = new Cesium.GeoJsonDataSource();
    return dataSource.load("ndata/dv/np-dv.topojson").then(function() {
      var entities, entity, j, len, mat_property;
      viewer.dataSources.add(dataSource);
      entities = dataSource.entities.values;
      mat_property = new Cesium.ColorMaterialProperty(new Cesium.Color.fromCssColorString('rgba(208,177,125, .87)'));
      for (j = 0, len = entities.length; j < len; j++) {
        entity = entities[j];
        if (entity.polygon) {
          entity.polygon.material = mat_property;
          entity.polygon.outline = new Cesium.ConstantProperty(false);
          entity.isNP = true;
          if (!oopt[entity.properties["Name_" + lang]]) {
            oopt[entity.properties["Name_" + lang]] = [];
          }
          oopt[entity.properties["Name_" + lang]].push(entity);
          oopt[entity.properties["Name_" + lang]]._id = entity.properties.ids_ID;
        }
      }
      return load_zp();
    });
  };

  load_np();

  load_zp = function() {
    var dataSource;
    dataSource = new Cesium.GeoJsonDataSource();
    return dataSource.load("ndata/dv/zp-dv.topojson").then(function() {
      var entities, entity, j, len, mat_property;
      viewer.dataSources.add(dataSource);
      entities = dataSource.entities.values;
      mat_property = new Cesium.ColorMaterialProperty(new Cesium.Color.fromCssColorString('rgba(105,131,40, .87)'));
      for (j = 0, len = entities.length; j < len; j++) {
        entity = entities[j];
        if (entity.polygon) {
          entity.polygon.material = mat_property;
          entity.polygon.outline = new Cesium.ConstantProperty(false);
          entity.isNP = false;
          if (!oopt[entity.properties["Name_" + lang]]) {
            oopt[entity.properties["Name_" + lang]] = [];
          }
          oopt[entity.properties["Name_" + lang]].push(entity);
          oopt[entity.properties["Name_" + lang]]._id = entity.properties.ids_ID;
        }
      }
      return build_pups();
    });
  };

  build_pups = function() {
    var billboards, center, color, entity_key, j, key, keys, len, rect;
    billboards = scene.primitives.add(new Cesium.BillboardCollection());
    keys = [];
    for (key in oopt) {
      keys.push(key);
    }
    keys = keys.sort();
    for (j = 0, len = keys.length; j < len; j++) {
      entity_key = keys[j];
      $(".left_menu").append('<div>');
      $(".left_menu div:last-child").text(entity_key).on('click', function(e) {
        var rect, text;
        $('.popup').hide();
        text = $(this).text();
        rect = get_oopt_rect(text);
        scene.camera.flyTo({
          destination: rect
        });
        selected_polygon_name = text;
        setTimeout(open_menu, 100);
        return e.stopPropagation();
      });
      if (oopt[entity_key][0].isNP) {
        color = new Cesium.Color.fromCssColorString('rgb(206, 153, 48)');
        $(".left_menu div:last-child").addClass('np');
      } else {
        $(".left_menu div:last-child").addClass('zp');
        color = new Cesium.Color.fromCssColorString('rgb(140,200,17)');
      }
      rect = get_oopt_rect(entity_key);
      center = Cesium.Rectangle.center(rect);
      center = [center.latitude, center.longitude];
      if (entity_key === 'Ostrov Vrangelya') {
        center = [rect.north, rect.east];
      }
      oopt[entity_key].center = center;
      billboards.add({
        image: 'images/pin.png',
        position: Cesium.Cartesian3.fromRadians(center[1], center[0], 20000),
        horizontalOrigin: Cesium.HorizontalOrigin.Center,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        id: entity_key,
        color: color,
        translucencyByDistance: new Cesium.NearFarScalar(1500000, 0, 1600000, 1),
        scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.5, 1.5e7, 0.75)
      });
    }
    return load_borders();
  };

  load_borders = function() {
    var border_source;
    border_source = new Cesium.GeoJsonDataSource();
    return border_source.load('ndata/dv/federal_dv.topojson').then(function() {
      var b_entities, b_entitiy, j, len, positions, results;
      b_entities = border_source.entities.values;
      results = [];
      for (j = 0, len = b_entities.length; j < len; j++) {
        b_entitiy = b_entities[j];
        positions = b_entitiy.polygon.hierarchy.getValue().positions;
        results.push(primitives.add(new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.PolylineGeometry({
              positions: positions,
              width: 1.0,
              vertexFormat: Cesium.PolylineColorAppearance.VERTEX_FORMAT
            }),
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color.fromCssColorString('rgba(45,25,15, .33)'))
            }
          }),
          appearance: new Cesium.PolylineColorAppearance()
        })));
      }
      return results;
    }, load_cities());
  };

  load_cities = function() {
    return load_popups_data();
  };

  load_popups_data = function() {
    return $.getJSON('data/data.json', function(data) {
      return popups_data = data.data;
    });
  };

  handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

  ellipsoid = scene.globe.ellipsoid;

  handler.setInputAction((function(movement) {
    var polygon, polygon_name, rect;
    if (selected_polygon_name !== "") {
      close_menu();
    }
    polygon = scene.drillPick(movement.position)[0];
    if (polygon) {
      if ((typeof polygon.id) === "string") {
        polygon_name = polygon.id;
      } else {
        polygon_name = polygon.id.properties["Name_" + lang];
      }
      selected_polygon_name = polygon_name;
      rect = get_oopt_rect(polygon_name);
      scene.camera.flyTo({
        destination: rect
      });
      selected_polygon_name = polygon_name;
      return setTimeout(open_menu, 100);
    }
  }), Cesium.ScreenSpaceEventType.LEFT_CLICK);

  get_oopt_rect = function(name) {
    var _points, cartographics, j, len, polygon, rect, ref;
    _points = [];
    ref = oopt[name];
    for (j = 0, len = ref.length; j < len; j++) {
      polygon = ref[j];
      _points = _points.concat(polygon.polygon.hierarchy.getValue().positions);
    }
    cartographics = Cesium.Ellipsoid.WGS84.cartesianArrayToCartographicArray(_points);
    cartographics = cartographics.filter(function(val) {
      return val.height === 0;
    });
    rect = Cesium.Rectangle.fromCartographicArray(cartographics);
    rect.south -= Math.abs(rect.south - rect.north) * 0.6;
    rect.north += Math.abs(rect.south - rect.north) * 0.1;
    return rect;
  };

  cities = [
    {
      "coordinates": [37.61325, 55.748],
      "name": "Moscow"
    }, {
      "coordinates": [73.35733, 54.91536],
      "name": "Omsk"
    }, {
      "coordinates": [104.18426, 52.19257],
      "name": "Irkutsk"
    }, {
      "coordinates": [134.85471, 48.5309],
      "name": "Khabarovsk"
    }
  ];

  $('.home_btn').on('click', function() {
    return scene.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(85, 60, 10000000.0),
      duration: 3
    });
  });

  $('.map_selector').on('click', function(e) {
    if (e.offsetX > 177 / 2) {
      bing_map.alpha = 1;
      osm_map.alpha = 0;
      pole_primitive.show = false;
      $('.map_selector_fader').transition({
        x: 0
      }, 100, 'ease');
    } else {
      osm_map.alpha = 1;
      bing_map.alpha = 0;
      pole_primitive.show = true;
      $('.map_selector_fader').transition({
        x: -93
      }, 100, 'ease');
    }
    return e.stopPropagation();
  });

  $('.popup_menu').on('click', function(e) {
    return e.stopPropagation();
  });

  $('.popup_menu .info').on('click', function(e) {
    e.preventDefault();
    return open_info_popup();
  });

  is_video_enable = true;

  $('.popup_menu .video').on('click', function(e) {
    e.preventDefault();
    if (is_video_enable) {
      return open_video_popup();
    }
  });

  is_photo_enable = true;

  $('.popup_menu .photo').on('click', function(e) {
    e.preventDefault();
    if (is_photo_enable) {
      return open_photo_popup();
    }
  });

  $('.popup_menu .web').on('click', function(e) {
    e.preventDefault();
    return open_web_popup();
  });

  open_menu = function() {
    var element, j, len, ref, selected_id;
    selected_id = oopt[selected_polygon_name]._id;
    prepare_popup(selected_id);
    $('.info-panel').removeClass("info-panel--hidden");
    ref = oopt[selected_polygon_name];
    for (j = 0, len = ref.length; j < len; j++) {
      element = ref[j];
      element.polygon.outline = new Cesium.ConstantProperty(true);
      element.polygon.outlineColor = new Cesium.ColorMaterialProperty(new Cesium.Color(1, 1, 1, 1));
    }
    return $('.left_menu div').each(function() {
      $(this).removeClass('selected_item');
      if ($(this).text() === selected_polygon_name) {
        return $(this).addClass('selected_item');
      }
    });
  };

  close_menu = function() {
    var element, j, len, ref, results;
    $('.left_menu div').removeClass('selected_item');
    $('.info-panel').addClass("info-panel--hidden");
    ref = oopt[selected_polygon_name];
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      element = ref[j];
      element.polygon.outline = new Cesium.ConstantProperty(false);
      results.push(element.polygon.outlineColor = new Cesium.ColorMaterialProperty(new Cesium.Color(1, 1, 1, 0)));
    }
    return results;
  };

  $(document).on('click', function() {
    if (selected_polygon_name !== "") {
      return close_menu();
    }
  });

  open_info_popup = function() {
    $('.popup').fadeIn();
    $('.popup>div').hide();
    return $('.popup .info').show();
  };

  open_video_popup = function() {
    $('.popup').fadeIn();
    $('.popup>div').hide();
    $('.popup .video').show();
    $('video')[0].currentTime = 0;
    return $('video')[0].play();
  };

  open_photo_popup = function() {
    $('.popup').fadeIn();
    $('.popup>div').hide();
    return $('.popup .photo').show();
  };

  open_web_popup = function() {
    $('.popup').fadeIn();
    $('.popup>div').hide();
    return $('.popup .web').show();
  };

  $('.close_popup').on('click', function(e) {
    $('.popup').hide();
    $('video')[0].pause();
    return e.stopPropagation();
  });

  showed_image = 1;

  num_images = 0;

  $('.photos_left').on('click', function(e) {
    e.stopPropagation();
    showed_image--;
    if (showed_image <= 0) {
      showed_image = num_images;
    }
    $('.photo_container img').hide();
    $('.photo_container img').eq(showed_image).fadeIn();
    $('.photo_caption span').hide();
    return $('.photo_caption span').eq(showed_image).fadeIn();
  });

  $('.photos_right').on('click', function(e) {
    e.stopPropagation();
    showed_image++;
    if (showed_image > num_images) {
      showed_image = 1;
    }
    $('.photo_container img').hide();
    $('.photo_container img').eq(showed_image).fadeIn();
    $('.photo_caption span').hide();
    return $('.photo_caption span').eq(showed_image).fadeIn();
  });

  $('.popup').on('click', function(e) {
    return e.stopPropagation();
  });

  prepare_popup = function(_id) {
    var current_popup_data, dta, j, len, second_name;
    current_popup_data = {};
    for (j = 0, len = popups_data.length; j < len; j++) {
      dta = popups_data[j];
      if (dta.id === _id) {
        current_popup_data = dta;
      }
    }
    second_name = oopt[selected_polygon_name][0].isNP ? {
      "en": "National Park",
      "ru": "Национальный парк"
    }[lang] : {
      "en": "Nature Reserve",
      "ru": "Заповедник"
    }[lang];
    $('.popup h2').text(selected_polygon_name + " " + second_name);
    $('.info-panel__title').text(selected_polygon_name);
    $('.info-panel__subtitle').text(second_name);
    build_gallery(current_popup_data.images, current_popup_data.id, current_popup_data.captions);
    build_info(current_popup_data.id);
    build_video(current_popup_data.id);
    return build_web(current_popup_data.url);
  };

  build_gallery = function(_num_images, folder_name, captions) {
    var i, j, ref;
    $('.photo_container img').remove();
    is_photo_enable = true;
    $('.popup_menu .photo').removeClass("disabled");
    if (_num_images === 0) {
      is_photo_enable = false;
      $('.popup_menu .photo').addClass("disabled");
    }
    $('.photo_container').append($('<img>').attr('src', 'data/' + folder_name + '/photo/' + _num_images + '.jpg'));
    $('.photo_caption').append($('<span />'));
    for (i = j = 1, ref = _num_images; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      $('.photo_container').append($('<img>').attr('src', 'data/' + folder_name + '/photo/' + i + '.jpg'));
      if (captions && captions[i - 1]) {
        $('.photo_caption').append($('<span />').html(captions[i - 1][lang]));
      }
    }
    $('.photo_container').append($('<img>').attr('src', 'data/' + folder_name + '/photo/1.jpg'));
    $('.photo_container img').fadeOut(50);
    $('.photo_caption span').fadeOut(50);
    $('.photo_container img').eq(showed_image).fadeIn(50);
    $('.photo_caption span').eq(showed_image).fadeIn(50);
    return num_images = _num_images;
  };

  build_info = function(_id) {
    $('.info iframe').attr('src', 'data/' + _id + '/index.html');
    return $('.info iframe').load(function() {
      var head;
      head = $(".info iframe").contents().find("head");
      return head.append($("<link/>", {
        rel: "stylesheet",
        href: "../info_style.css",
        type: "text/css"
      }));
    });
  };

  build_web = function(url) {
    return $('.web iframe').attr('src', url);
  };

  build_video = function(_id) {
    var video_parent;
    is_video_enable = true;
    $('.popup_menu .video').removeClass("disabled");
    video_parent = $('video').parent();
    $('video').remove();
    video_parent.append('<video class="popup__panel__inner"></video>');
    $('video').attr('src', 'data/' + _id + '/video/1.mov');
    $('video').attr('src-mp4', 'data/' + _id + '/video/1.mp4');
    $('video').attr('preload', 'metadata');
    $('video').attr('controls', 'true');
    return $("video").on("error", function() {
      if ($('video').attr('src') === $('video').attr('src-mp4')) {
        is_video_enable = false;
        return $('.popup_menu .video').addClass("disabled");
      } else {
        return $('video').attr('src', $('video').attr('src-mp4'));
      }
    });
  };

  date = new Date();

  is_globus_moved = false;

  $(document).on('mouseup', function() {
    date = new Date();
    return is_globus_moved = true;
  });

  check_time = function() {
    if (!is_globus_moved) {
      return;
    }
    if (((new Date()) - date) > (5 * 60 * 1000)) {
      return location.reload();
    }
  };

  setInterval(check_time, 1000);

}).call(this);

//# sourceMappingURL=script.js.map
