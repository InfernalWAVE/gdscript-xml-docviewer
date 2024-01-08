# gdscript-xml-docviewer
a way to view gdscript documentation XML files outputted by the CLI --doctool --gdscript-docs in Godot. Renders HTML in browser using an XSLT file.

![image](https://github.com/InfernalWAVE/gdscript-xml-docviewer/assets/48569884/2a2f84ff-72d5-4314-8073-64ca435f1229)

tested with xsltransform.net

# relevant godot docs
- command line tutorial:
https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html

- gdscript documentation comments:
https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_documentation_comments.html

# NOTE
gdscript documentation comments support documenting several more features than what the xslt file handles at this time. right now it captures documentation for the script, member variables, and member functions.
