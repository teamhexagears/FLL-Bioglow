# Team Red - M8 + M9 + M10 - Tree House
# starting position=3rd square from the left

if __name__ == "__main__":
    import main
    

from pybricks.tools import run_task

def r1(robot):
    # Reset and move to tree
    run_task(robot.curve_move_reset(radius=700, distance=61, speed=500, right_power=60, right_speed=500))
    robot.right_attachment_turn(-250, 6000)
    robot.turn(-170, 800)
    robot.move(-15, 1000)
    robot.turn(122, 800)

    # vine
    run_task(robot.right_attachment_reset(power=50, speed=6000))

    # platform
    robot.move(distance=21, speed=1000)

    #new vine by bear
    robot.right_attachment_turn(-120, 6000)


    robot.move(-8, speed=50)

    # new right hand down by bear
    robot.right_attachment_turn(110, 6000)

    # Go home
    robot.move(distance=-5, speed=1000)
    robot.turn(-140, 800)
    robot.move(distance=60, speed=1000)
    robot.stop()