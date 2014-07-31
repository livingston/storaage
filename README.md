storaage [![Build Status](https://snap-ci.com/livingston/storaage/branch/master/build_image)](https://snap-ci.com/livingston/storaage/branch/master) ![Dependencies Status](https://david-dm.org/livingston/storaage.png)
============

Better Interface for localStorage and sessionStorage


####Usage

Example:

```
//Create an entry in sessionStorage
var userData = new Storaage('user_session');

//Store data
userData.data = { id: 42500234, name: 'Travis', role: 'Member' };

//Retrive a specific item from store
userData.getItem('name');	//returns 'Travis'

//Set a specific item to the store
userData.setItem('role', 'Admin');

//Retrive the entire data
userData.data;				// return { id: 42500234, name: 'Travis', role: 'Admin' }
```
