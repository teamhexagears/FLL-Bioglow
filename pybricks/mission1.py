if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def m1(robot):
    #robot.set_gear_ratio([12, 20])
    run_task(robot.both_attachment_turn(200, 400))