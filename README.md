# Registry of Fixed Assets 
*Mobile React Native application made as a project for university. The project was meant as a proof of concept in terms of mobile UI development and other aspects such as security weren't considered during development.* 

The application features ways to keep records of employees, business locations, owned assets at locations and asset transfer lists. 
The starting screen of the application contains 4 tabs:
- Assets
- Employees
- Locations
- Transfer lists

## Assets Tab 
The Assets tab contains a list of currently entered assets.  

![alt text](https://github.com/tchumahee/Register-of-Fixed-Assets/blob/master/screenshots/assets.png?raw=true)  

Clicking on the appropriate floating button brings out a form to add a new asset. To help fill in the necessary information in this case, a barcode scanner is embedded for quicker input,
as well as a way to both select an existing image for the asset from the gallery or take a new photo on the spot. Responsible employees and locations are selected from the existing database. 

Existing list items can be selected to view more detail, edit or delete.

![alt text](https://github.com/tchumahee/Register-of-Fixed-Assets/blob/master/screenshots/add-new-asset.png?raw=true)  

## Employees Tab 
This tab contains a list of existing employees with the ability to add, edit and delete. 

![alt text](https://github.com/tchumahee/Register-of-Fixed-Assets/blob/master/screenshots/employees.png?raw=true) 

## Locations Tab 
This tab shows the current operating locations of the business, either in list view or on a Google map, represented as pink pins. New locations can be added via the map view. Clicking on a pin
 shows a list of items registered at the location. 

![alt text](https://github.com/tchumahee/Register-of-Fixed-Assets/blob/master/screenshots/locations.png?raw=true) 

![alt text](https://github.com/tchumahee/Register-of-Fixed-Assets/blob/master/screenshots/add-new-location.png?raw=true) 
  
![alt text](https://github.com/tchumahee/Register-of-Fixed-Assets/blob/master/screenshots/location-assets.png?raw=true)  

## Transfer Lists Tab 
Transfer lists are identified by the date created in the list viewable list. They additionally include information on assets transfered, their previous and new owner, as well as the previous location from which it was transferred and the new one.
A new list can be added by clicking on the floating add button. From here, specific items can be chosen and their new owning employee and location chosen, after which the item is added to the list. After editing is completed the new transfer list
 can be added. 

![alt text](https://github.com/tchumahee/Register-of-Fixed-Assets/blob/master/screenshots/transfer-lists.png?raw=true) 

![alt text](https://github.com/tchumahee/Register-of-Fixed-Assets/blob/master/screenshots/new-asset-transfer-list.png?raw=true) 
