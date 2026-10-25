#green team 1 from the bottom
# Mission 14 - Seeds of Renewal

if __name__ == "__main__":
    import main

from pybricks.tools import run_task, wait

def r9(robot):
    robot.move(46, speed=1000)
    robot.right_attachment_turn(120)
    robot.thrust(distance=7, speed=1000)
    robot.right_attachment_turn(-120)
    robot.thrust(distance=-7, speed=1000)
    wait(1000)
    while(True):
        robot.thrust(distance=8, speed=1000)
        robot.turn(15, 800)
        robot.turn(-30, 800)
        robot.turn(30, 800)
        robot.turn(-30, 800)
        robot.turn(15, 800)
        robot.thrust(distance=-8, speed=1000)