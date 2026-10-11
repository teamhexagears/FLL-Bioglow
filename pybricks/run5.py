# Team Green - M1(drone) + M11a (seed retrieval)
# Starting position??

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r5(robot):
    run_task(robot.both_attachment_reset(distance=80, move_speed=500, left_power=-50, right_power=0))
    #robot.move(80, 500)
    robot.turn(-20)
    robot.move(6)
    robot.move(-3)
    robot.turn(-40, 500)
    robot.turn(40, 500)
    robot.move(-3)
    robot.turn(20)
    robot.move(-20)
    robot.turn(-60)
    robot.move(35)
    robot.turn(50)
    robot.left_attachment_turn(angle=200, speed=400)
    robot.move(32)
    robot.left_attachment_turn(-200)
    robot.turn(30)
    robot.move(65)