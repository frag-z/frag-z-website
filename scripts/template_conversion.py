from typing import Dict, Callable
import os

def frag_z_template_conversion(path_to_content_file: str, file_name: str, template_file: str):
    """
    If it's processing a/b/c/file.html, then path_to_content_file refers to that whole path, and 
    file_name refers to file.html, template_file refers to the template file being used for file.html
    """
    with open(template_file, "r") as f:
        template_lines = f.readlines()

    file_name = os.path.splitext(os.path.basename(file_name))[0]
    page_title = file_name.replace('_', ' ').title()

    title_line_index = next(i for i, s in enumerate(template_lines) if "<title>PAGE TITLE</title>" in s)
    template_lines[title_line_index] = template_lines[title_line_index].replace("PAGE TITLE", page_title)

    with open(path_to_content_file, "r") as f:
            content_string = f.read()

    main_content_area_index = next(i for i, s in enumerate(template_lines) if "CONTENT" in s)
    template_lines[main_content_area_index] = template_lines[main_content_area_index].replace("CONTENT", content_string)

    with open(path_to_content_file, "w") as f:
        contents = "".join(template_lines)
        f.write(contents)


template_file_to_conversion : Dict[str, Callable[[str, str, str], None]] = {
    "frag_z_template.html": frag_z_template_conversion
}
