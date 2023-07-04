#!/usr/bin/env python3
import cgi

form = cgi.FieldStorage()

landWidth = form.getfirst("landWidth",'')
landLength = form.getfirst("landLength",'')
emptyPlace = form.getvalue('emptyPlace')
typeOfAreaList = form.getvalue('typeOfPlace')

print( "Content-type: text/html\n" )
print("""<!DOCTYPE HTML>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Обработка данных форм</title>
        </head>
        <body>""")

print("<h1>Обработка данных форм!</h1>")
print("<p>Ширина: {}</p>".format(landWidth))
print("<p>Длина: {}</p>".format(landLength))
print("<p>Список: {}</p>".format(typeOfAreaList))

print("""</body>
        </html>""")