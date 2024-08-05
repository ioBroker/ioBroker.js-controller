# Common class for ioBroker
The Library contains the common utils of ioBroker which use the DB directly and thus cannot be required by the DB itself (cirular dependencies).
It makes sense to place methods here too, which require typings from the database if they are surely not used by the database.

## License
MIT
Copyright 2018-2024 bluefox <dogafox@gmail.com>  
