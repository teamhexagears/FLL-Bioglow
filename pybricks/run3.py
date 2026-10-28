# team Red - M3 - Flip the Rock
# Starting position: corner

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r3(robot):
    robot.thrust(50, speed=1000)    
    robot.move(-45, 1000)
    robot.stop()
