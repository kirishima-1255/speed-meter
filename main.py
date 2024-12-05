import tkinter as tk
import math
import random
import os
from pathlib import Path
import time
import asyncio

global canvas, root

def create_window():
    """ウィンドウとキャンバスの初期設定"""
    global root, canvas, background, frame
    
    #初期画面設定
    parent = Path(__file__).resolve().parent
    os.chdir('..')
    root = tk.Tk()
    root.title("Test")
    root.geometry("1024x600")
    
    # フレームを作成
    frame = tk.Frame(root)
    frame.place(x=0, y=0, relwidth=1, relheight=1)
    
    # ファイルを参照
    background = tk.PhotoImage(file=parent.joinpath("image/design.png"))
    # Labelの作成
    bg = tk.Label(frame, image=background)
    bg.place(x=-2, y=-2)

    #blocker画像の読み込み
    #blockerpng = tk.PhotoImage(file=parent.joinpath("image/blocker.png").resolve(), width=60, height=40)
    canvas = tk.Canvas(frame, width=80, height=450)
    canvas.place(x=90, y=140)


def abs_lamp(status):
    #黒四角形により非表示化 0:表示 1:非表示
    if status == 1:
        abs_lamp_off = canvas.create_rectangle(
            0,0,40,100,
            fill="blue",
            tag="abs_lamp"
        )
        canvas.update()
    else:
        try:
            abs_lamp.destroy()
        except:
            pass
    
    return



async def abs_first_setting():
    """初期画面設定""" 
    abs_lamp(0)
    await asyncio.sleep(1)
    #abs_lamp(1)



# def abs_lamp(blockerpng, status):
#     #黒画像により非表示化 0:表示 1:非表示
#     if status == 1:
#         abs_lamp = tk.Label(frame, image=blockerpng, bd=0)
#         abs_lamp.place(x=90, y=140)
#         abs_lamp.update()
#     else:
#         try:
#             abs_lamp.destroy()
#         except:
#             pass
    
#     return



# async def abs_first_setting():
#     """初期画面設定""" 
#     abs_lamp(blockerpng, 0)
#     await asyncio.sleep(1)
#     abs_lamp(blockerpng, 1)
#     return 0

async def main():
    create_window()
    root.mainloop()  # メインループはmain関数の最後に配置
    await abs_first_setting()



asyncio.run(main())