# earthquake-digitalO
Repository for group 4 in data-x. Team members: Jerry Wang, Krystal Ren, Endre Hauge Paulsen and Mari Hovem Leonhardsen. 

This repository contains code for the web application available at earthquake-visualization.com
The code for this application is written with the Django framework. Below is a brief description of the file hierarchy, and the most important files. 

	1.	Earthquake
		a.	Static
			i. 	admin
    		ii.	Analysis: contains CSS and JavaScript files for analysis page.
    		iii.	Data: contains CSS and JavaScript files for data page.
   			iv.	Editpublic: contains CSS and JavaScript files for editpublic page.
    		v.	Files: contains cvs files with sensor information. 
    		vi.	Home: contains CSS and JavaScript files for home page.
    		vii.	Login: contains CSS and JavaScript files for login page.
    		viii.	open-iconic: contains style files
    		ix.	public: contains CSS and JavaScript files for public page.
    		x.	python_scripts: contains data processing files. 
  		b.	Settings.py
  		c.	Urls.py: links url to associated view.
	2.	Earthquake_map: The application folder. 
  		a.	Templates
    		i.	Analysis: HTML for ananlysis page. 
    		ii.	Editpublic: HTML for edit public page.
    		iii.	Login: HTML for login page.
    		iv.	Public: HTML for public page.
    		v.	Admin_home.html 
    		vi.	Data.html
  		b.	Models.py: Contains a model for earthquake_objects. 
  		c.	Views.py: Main controller script. Combines HTML templates with data input. 
	3.	manage.py
	4.	requirements.txt: lists necessary libraries to run the app. 
