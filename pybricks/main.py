# this is main, run code from here
from run1 import r1
from run2 import r2
from run3 import r3
from run4 import r4
from run5 import r5
from run6 import r6
from robot import Robot
from pybricks.tools import multitask, run_task, wait, hub_menu
from pybricks.parameters import Color

robot = Robot()

original = [1, 2, 3, 4, 5, 6]
options = original
while True:
    # select list
    selected = hub_menu(*options)

    robot.hub.light.off()
    if selected == 1:
        r1(robot)
    elif selected == 2:
        r2(robot)
    elif selected == 3:
        r3(robot)
    elif selected == 4:
        r4(robot)
    elif selected == 5:
        r5(robot)
    elif selected == 6:
        r6(robot)

    robot.hub.light.on(Color.GREEN)
    
    # come up with next options list
    last_selected = selected
    counter = 0
    options = original.copy()
    while counter < last_selected - 1:
        popped=options.pop(0)
        options.append(popped)
        counter += 1