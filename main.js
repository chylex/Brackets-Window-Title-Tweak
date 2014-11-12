define(function(require,exports,module){
  'use strict';
  
  var AppInit = brackets.getModule("utils/AppInit");
  var DocumentManager = brackets.getModule("document/DocumentManager");
  var ProjectManager = brackets.getModule("project/ProjectManager");
  var MainViewManager = brackets.getModule("view/MainViewManager");
  
  function updateWindowTitle(){
    var title = "";
    
    var proj = ProjectManager.getProjectRoot();
    var path = MainViewManager.getCurrentlyViewedPath(MainViewManager.ACTIVE_PANE);
    
    if (proj)title += "Project - "+proj._name;
    
    if (path){
      title += proj ? " - " : "File - ";
      title += ProjectManager.makeProjectRelativeIfPossible(MainViewManager.getCurrentlyViewedFile()._path);
    }
    
    document.title = title == "" ? brackets.config.app_title : title;
  };
  
  AppInit.htmlReady(function(){ updateWindowTitle(); });
  $(DocumentManager).on("dirtyFlagChange",function(){ updateWindowTitle(); });
  $(ProjectManager).on("projectOpen",function(){ updateWindowTitle(); }).on("projectRefresh",function(){ updateWindowTitle(); });
  $(MainViewManager).on("currentFileChange",function(){ updateWindowTitle(); });
});