# this is main, run code from here
from mission1 import m1
from mission2 import m2
from mission3 import m3
from mission4 import m4
from mission5 import m5
from robot import Robot
from pybricks.tools import multitask, run_task, wait, hub_menu
from pybricks.parameters import Color

robot = Robot()

original = [1, 2, 3, 4, 5]
options = original
while True:
    # select list
    selected = hub_menu(*options)

    robot.hub.light.off()
    if selected == 1:
        run_task(robot.attachment_reset(380))
        m1(robot)
    elif selected == 2:
        m2(robot)
    elif selected == 3:
        m3(robot)
    elif selected == 4:
        run_task(m4(robot))
    elif selected == 5:
        m5(robot)
    
    robot.hub.light.on(Color.GREEN)
    
    # come up with next options list
    last_selected = selected
    counter = 0
    options = original.copy()
    while counter < last_selected - 1:
        popped=options.pop(0)
        options.append(popped)
        counter += 1