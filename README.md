# NeedToPee

NeedToPee was originally created at Startup Weekend Wellington in February 2014 and [come out as a runner-up](https://idealog.co.nz/venture/2014/02/music-app-tops-welly-startup-weekend).
NeedToPee is a free service for finding the nearest bathroom or toilet when you really, really need it.

The site is hosted on Github Pages and is available at http://michaeldowse.github.io/NeedToPee. Master is used as a development branch, the gh-pages branch represents what is currently in production.

## Coverage

NeedToPee currently only supports public bathrooms administered by the Wellington City Council in the Wellington region.

## Location Data

Location data should be provided in, or converted to a json array of locations. A location is a json object (described below) which must include a set of gps coordinates and may include a series of properties describing the facility which will be displayed directly to the user. All properties are optional but recommended.

    {
		'type' : 'Toilet'
		'geometry' : {
			'type' : 'Point'
			'coordinates' : [{gps_x_coordinate}, {gps_y_coordinate}]
			'properties' : {
			'Open_hours' : '24 Hours'      // The facilities open hours, no format specified
			'Disabled' : 'Yes'             // Are facilities for disabled persons are available at this location? Yes or No
			'Suburb' : 'Wadestown'
			'Location' : 'Wadestown Road'  // Additional location details
			'Type' : 'Unisex'              // Other possible values: Male, Female
			'Change_room' : 'Yes'          // Are baby changing facilities available at this location? Yes or No
			}
		}
    }

## Contributors

NeedToPee made and maintain by:

*   [Christina Houlihan](https://nz.linkedin.com/in/choulihan)
*   Cayla Were
*   [Matthew Gray](https://matthew.nz)
*   [Gina Marie Stevens](https://www.buildtiny.co.nz/our)
*   [Seno Sulharyadi](http://seno.me)
*   Ken Kopelson
*   [Michael Dowse](http://michael.dowse.co.nz/)
