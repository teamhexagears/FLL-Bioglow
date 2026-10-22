# Team Red - M8 + M9 + M10
# starting position=4th square from the left

if __name__ == "__main__":
    import main
    

from pybricks.tools import run_task

def r3(robot):
    # Reset 
    run_task(robot.both_attachment_reset(distance=0, left_power=0, right_power=40))

    # move to tree
    run_task(robot.curve_move(radius=700, distance=74, speed=300))
    robot.turn(-59)

    # vine
    #robot.right_attachment_turn(-100, 6000)
    robot.move(8.5)
    robot.right_attachment_turn(-100, 6000)
    robot.move(-11)
    robot.right_attachment_turn(-90, 6000)

    # platform
    robot.move(distance=21, speed=1000)
    #robot.thrust(-5,711)
    #robot.thrust(5,711)
    robot.move(-10, speed=50)
    robot.turn(angle=-10, speed=50)
    robot.turn(10)
    robot.move(distance=-5, speed=100)
    robot.turn(-140)
    robot.move(distance=75, speed=1000)
