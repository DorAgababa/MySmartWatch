@echo off




rem get into nodejs directory
cd NodeJSscript


echo run NodeJS

rem run it in the directory
node getDataToFolder.js

rem Navigate to the main directory of the current batch file 
cd /d "%~dp0"

rem get into quartosDirectory(get inside Stage2 directory)
cd Stage2

rem Search for Quartus installation in default directory
for /d %%D in (C:\intelFPGA_lite\*) do (
    if exist "%%D\quartus\bin64\quartus_sh.exe" (
        setx QUARTUS_ROOTDIR "%%D"
        echo %QUARTUS_ROOTDIR%
        setx PATH "%QUARTUS_ROOTDIR%\quartus\bin64;%QUARTUS_ROOTDIR%\quartus;%PATH%"
        break;
    )
)



rem Search for Quartus directory if its not defualt
if not defined QUARTUS_ROOTDIR (
    echo from my my see ROOTDIR IS NOT DEFINED
	set "QUARTUS_DIR="
	for /r "C:\" %%I in ("quartus_sh.exe") do set "QUARTUS_DIR=%%~dpI.."

	if "%QUARTUS_DIR%" == "" (
    	echo Quartus directory not found
	) else (
    	rem Set environment variables
    	setx QUARTUS_ROOTDIR "%QUARTUS_DIR%"
    	setx PATH "%QUARTUS_ROOTDIR%\quartus\bin64;%QUARTUS_ROOTDIR%\quartus;%PATH%"
    	echo Quartus directory set to %QUARTUS_DIR%
	)
)

rem unarchive the qar file
quartus_sh --restore TimeIT.qar

rem run TCL script
quartus_sh -t DE10_LITE_PINS.tcl -no_gui


rem Compile the Quartus project
quartus_sh --flow compile TimeIT.qpf

rem Program the FPGA
quartus_pgm -m jtag -c USB-Blaster -o "p;TimeIT.sof"


echo   python work on UART 

rem Navigate to the main directory of the current batch file 
cd /d "%~dp0"

REM Check if serial package is installed
py -c "import serial" >nul 2>&1
if %errorlevel% equ 0 (
    echo Serial package is already installed.
) else (
    echo Installing serial package...
    py -m pip install serial
)

REM Check if serial package is installed
py -c "import pyserial" >nul 2>&1
if %errorlevel% equ 0 (
    echo pySerial package is already installed.
) else (
    echo Installing pyserial package...
    py -m pip install pyserial
)
rem run python program 
py  pythonScript\main.py"




pause




pause
