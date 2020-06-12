# Migration Monitor
The Migration Monitor is a data-visualization module capable of representing migration related data as line/bar/pie charts.
The Editor allows users to upload JSON and csv files as data sources, or connect to an restfulAPI.

The data uploaded or connected has to follow a simple format (specified in the **JSON** and **csv** sections below).

> If the API data is not compatible, you will need a **backend adaptor** for the data to be rendered in the frontend.

## using the editor

**[The editor](http://localhost:8080/situation/editor)**, allows users to provide the necessary information for the Migrant Monitor to create and render new charts.

### Category Editor
In the Migration Monitor, charts will be displayed in groups according to their categorization.
**[This editor](http://localhost:8080/situation/editor#CategoryEditor)** allows users to manage the categories.

### Add New Chart
**[This editor](http://localhost:8080/situation/editor#AddNewChart)** allows users to upload data for new charts.
Below are the description of each input fields.
| field                    | default | data type | definition                                        |
|--------------------------|---------|-----------|---------------------------------------------------|
| Chart title              | -       | string    | graph title                                       |
| Category                 | -       | string    | graph **[category](#category-editor)**            |
| Chart type               | BAR     | string    | chat type, choose between BAR/LINE/PIE            |
| x axis                   | -       | string    | key for x values                                  |
| y axis                   | -       | string    | key for y values                                  |
| description              | -       | string    | graph description                                 |
| X axis is unix-timestamp | false   | boolean   | is x axis values in the format of unix-timestamp? |
| Data format              | -       | string    | data format, choose between JSON/csv/API          |
| Choose csv               | -       | csv       | choose local csv file                             |
| Choose JSON              | -       | JSON      | choose local JSON file                            |
| API address              | -       | string    |                                                   |

## JSON specs

The following example demonstrates the data structure required for the uploaded JSON files, 
where "mic:datum" and "mic:wert" correspond to the string input in the "x axis" and "y axis" from the **["Add New Chart"](#add-new-chart)** editor:

``` json
 [
    {
        "mic:datum": "2015-06",
        "mic:wert": "56"
    },
    {
        "mic:datum": "2015-07",
        "mic:wert": "88"
    },
    {
        "mic:datum": "2015-08",
        "mic:wert": "101"
    },
    {
        "mic:datum": "2015-09",
        "mic:wert": "122"
    }
]
```

## csv specs
