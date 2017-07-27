var currentFile = new File($.fileName);
var isMacOS = currentFile.lineFeed == "macintosh";
var interval = isMacOS ? "/" : "\\";

function copyPsdFileToTempFold() {

    if (String(app.name).search("Photoshop") > 0) {

        if (!documents.length) {

            // alert("There are no open documents. Please open a file to run this script.")
            return;
        }

        var sourceArray = app.activeDocument.name.split('.');
        var sourceType = sourceArray.pop();
        var newFileName = "errnull_tempSource." + sourceType;
        var finalFileName = app.activeDocument.name + ".bak";
        var newFile = new File(app.activeDocument.path + interval + newFileName);

        var saveOptions = new PhotoshopSaveOptions();
        app.activeDocument.saveAs(newFile, saveOptions, true, Extension.LOWERCASE);

        var finalFile = new File(app.activeDocument.path + interval + finalFileName);
        if (finalFile.exists){
            finalFile.remove();
        }
        newFile.rename(finalFileName);
    }
}

if(currentFile.displayName == "errnull_ps_auto_backup.jsx"){

    copyPsdFileToTempFold();

}else{

    var destinationPath = app.path + "/errnull_ps_auto_backup.jsx";
    if (!isMacOS){
        var destinationFile = new File(destinationPath);
        destinationPath = destinationFile.fsName;
    }
    currentFile.copy(destinationPath);
    try {
        app.notifiers.add("save", File(destinationPath));
    }catch (e){}
    alert("安装成功...");
}
