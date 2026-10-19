#green team 1 from the bottom
# Mission 14 - Seeds of Renewal

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r9(robot):
    robot.move(46)
    robot.right_attachment_turn(120)
    robot.thrust(distance=7, speed=800)
    robot.right_attachment_turn(-120)
    robot.thrust(distance=-7, speed=800)
    while(True):
        robot.thrust(distance=8, speed=800)
        robot.turn(15)
        robot.turn(-30)
        robot.turn(30)
        robot.turn(-30)
        robot.turn(15)
        robot.thrust(distance=-8, speed=800)