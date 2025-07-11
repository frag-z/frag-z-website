import re

cpp_source = """
    CommandRunner command_runner;

    Command change_gravity_command("set_gravity", "sg", "Set the gravity to a given number this unit is m/s^2",
                                   decorate_with_float_argument_parser([&](float grav) { physics.set_gravity(grav); }));

    Command change_rocket_explosion_radius("set_rocket_explosion_radius", "srer",
                                           "set the explosion radius of all rockets",
                                           create_float_setter_func(kmu_processor.explosion_radius));

    Command change_rocket_force("set_rocket_force", "srf", "set the force that gets applied when a rocket explodes",
                                create_float_setter_func(kmu_processor.rocket_force));

    Command change_enemy_popoff_normalized_distance_leniancy_power(
        "set_enemy_popoff_normalized_distance_leniancy_power", "sepndlp",
        "when there is an explosion we measure the distance to the explosion in a linear fashion in the range [0, 1] "
        "this distance is linear, so instead we add a power to make it a curve",
        create_float_setter_func(kmu_processor.enemy_popoff_normalized_distance_leniancy_power));

    Command change_enemy_popoff_force(
        "set_enemy_popoff_force", "sepf",
        "the popoff force is a force that helps get enemies off the ground when we shoot them with rockets",
        create_float_setter_func(kmu_processor.enemy_popoff_force));

    Command set_sniper_rifle_force("set_sniper_rifle_force", "ssrf",
                                   "sets the force applied to enemies when shot by the sniper rifle",
                                   create_float_setter_func(kmu_processor.sniper_rifle.base_bullet_force));

    Command set_shotgun_force("set_shotgun_force", "ssrf", "sets the force applied to enemies when shot by the shotgun",
                              create_float_setter_func(kmu_processor.shotgun.base_single_pellet_force));

    Command set_lightning_gun_force("set_lightning_gun_force", "slgf",
                                    "sets the force applied to enemies when shot by the lightning gun",
                                    create_float_setter_func(kmu_processor.lightning_gun.bullet_force));

    Command change_rocket_velocity_command("set_rocket_velocity", "srv", "set the rocket velocity",
                                           create_float_setter_func(kmu_processor.rocket_speed));

    Command change_grenade_velocity_command("set_grenade_velocity", "sgv", "set the grenade velocity",
                                            create_float_setter_func(kmu_processor.grenade_speed));

    Command change_jump_force_command("set_jump_force", "sjf", "set the jump force",
                                      create_float_setter_func(movement.jump_force));

    Command change_quick_succession_jump_force_command("set_quick_succession_jump_force", "sqsjf",
                                                       "set the quick succession jump force",
                                                       create_float_setter_func(movement.quick_succession_jump_force));

    Command change_max_walk_velocity_command("set_max_walk_velocity", "smwv", "set the max walking velocity",
                                             create_float_setter_func(movement.max_regular_walking_velocity));

    Command change_direction_snappiness_command("set_direction_snappiness", "sds",
                                                "set the direction change snappiness",
                                                create_float_setter_func(movement.direction_change_snappiness));

    Command change_movement_acceleration_command("set_movement_acceleration", "sma", "set the movement acceleration",
                                                 create_float_setter_func(movement.movement_acceleration));

    Command ready_up_command(
        "ready_up", "ru", "ready up the player",
        decorate_with_int_argument_parser([&](int client_id) { skill_death_match.ready_up(client_id); }));
"""

# Step 1: Extract ("name", "alias", "description") tuples using regex
pattern = re.compile(
    r'Command\s+\w+\s*\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*((?:"[^"]*"\s*)+),',
    re.MULTILINE
)

matches = pattern.findall(cpp_source)

# Combine description parts that may be split
def clean_description(desc):
    desc = desc.replace('\n', ' ').replace('" "', '')  # handle adjacent quoted strings
    return desc.replace('"', '').strip()

commands = [(name, alias, clean_description(desc)) for name, alias, desc in matches]

# Step 2: Generate HTML
html_header = """
<h1>Command Reference</h1>
<table border="1" cellpadding="6" cellspacing="0">
    <thead>
        <tr>
            <th>Name</th>
            <th>Alias</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
"""

html_footer = """
    </tbody>
</table>
"""

def escape_html(text):
    return (text.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;"))

def generate_rows(commands):
    rows = ""
    for name, alias, desc in commands:
        rows += f"            <tr>\n"
        rows += f"                <td>{escape_html(name)}</td>\n"
        rows += f"                <td>{escape_html(alias)}</td>\n"
        rows += f"                <td>{escape_html(desc)}</td>\n"
        rows += f"            </tr>\n"
    return rows

html = html_header + generate_rows(commands) + html_footer

# Step 3: Write to file
with open("commands.html", "w", encoding="utf-8") as f:
    f.write(html)

print(f"Extracted {len(commands)} commands -> commands.html")
