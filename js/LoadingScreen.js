BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {
    this._loadingDiv = document.createElement("div");
    this._loadingDiv.style.backgroundImage = 'url("' + backgroundimg + '")';
    this._loadingDiv.style.backgroundRepeat = 'no-repeat';
    this._loadingDiv.style.backgroundSize = '100% 100%';
    //this._loadingDiv.style.filter = 'blur(5px)';

    this._loadingDiv.id = "babylonjsLoadingDiv";
    this._loadingDiv.style.opacity = "0";
    this._loadingDiv.style.transition = "opacity 1.5s ease";
    this._loadingDiv.style.pointerEvents = "none";
    this._loadingDiv.style.display = "grid";
    this._loadingDiv.style.gridTemplateRows = "100%";
    this._loadingDiv.style.gridTemplateColumns = "100%";
    this._loadingDiv.style.justifyItems = "center";
    this._loadingDiv.style.alignItems = "center";



    // Loading text
    this._loadingTextDiv = document.createElement("div");
    this._loadingTextDiv.style.position = "absolute";
    this._loadingTextDiv.style.left = "0";
    this._loadingTextDiv.style.top = "70%";
    this._loadingTextDiv.style.marginTop = "10%";
    this._loadingTextDiv.style.width = "100%";
    this._loadingTextDiv.style.height = "5%";
    this._loadingTextDiv.style.fontFamily = "Arial";
    this._loadingTextDiv.style.fontSize = "14px";
    this._loadingTextDiv.style.color = "white";
    this._loadingTextDiv.style.textAlign = "center";
    this._loadingTextDiv.style.zIndex = "1";
    this._loadingTextDiv.innerHTML = "";
    

    this._loadingDiv.appendChild(this._loadingTextDiv);

    // Generating keyframes
    this._style = document.createElement("style");
    this._style.type = "text/css";
    const keyFrames = `@-webkit-keyframes spin1 {\
                0% { -webkit-transform: rotate(0deg);}
                100% { -webkit-transform: rotate(360deg);}
            }\
            @keyframes spin1 {\
                0% { transform: rotate(0deg);}
                100% { transform: rotate(360deg);}
            }`;
    this._style.innerHTML = keyFrames;
    document.getElementsByTagName("head")[0].appendChild(this._style);


    // Loading img



    var titleLoad = document.createElement("div");


    titleLoad.style.width = "100%";
    titleLoad.style.gridColumn = "0";
    titleLoad.style.gridRow = "0";
    titleLoad.style.top = "10%";
    titleLoad.style.position = "absolute";
    titleLoad.style.fontFamily = "Arial";
    titleLoad.style.fontSize = "250%";
    titleLoad.style.color = "white";
    titleLoad.style.textAlign = "center";
    titleLoad.style.fontWeight = "bold";
    titleLoad.innerHTML = titleLoading;
    this._loadingDiv.appendChild(titleLoad);


    var imgLoad = document.createElement("div");
    imgLoad.style.width = "100%";
    imgLoad.style.gridColumn = "0";
    imgLoad.style.gridRow = "0";
    imgLoad.style.top = "40%";
    imgLoad.style.left = "0%";
    imgLoad.style.fontFamily = "Arial";
    imgLoad.style.fontSize = "600%";
    imgLoad.style.color = "white";
    imgLoad.style.textAlign = "center";
    imgLoad.style.position = "absolute";
    imgLoad.style.zIndex = "1";
    imgLoad.style.fontWeight = "bold";
    imgLoad.innerHTML = lvlnumber;
    this._loadingDiv.appendChild(imgLoad);

    var imgLoad = document.createElement("div");
    imgLoad.style.width = "100%";
    imgLoad.style.gridColumn = "0";
    imgLoad.style.gridRow = "0";
    imgLoad.style.top = "70%";
    imgLoad.style.left = "0%";
    imgLoad.style.fontWeight = "bold";
    imgLoad.style.fontFamily = "Arial";
    imgLoad.style.fontSize = "250%";
    imgLoad.style.color = "white";
    imgLoad.style.textAlign = "center";
    imgLoad.style.position = "absolute";
    imgLoad.innerHTML = "Loading...";
    this._loadingDiv.appendChild(imgLoad);

    var imgLoad = document.createElement("div");
    imgLoad.style.width = "100%";
    imgLoad.style.gridColumn = "0";
    imgLoad.style.gridRow = "0";
    imgLoad.style.top = "90%";
    imgLoad.style.left = "0%";
    imgLoad.style.fontWeight = "bold";
    imgLoad.style.fontFamily = "Arial";
    imgLoad.style.fontSize = "110%";
    imgLoad.style.color = "white";
    imgLoad.style.textAlign = "center";
    imgLoad.style.position = "absolute";
    imgLoad.innerHTML = tipslist[tipslist.length * Math.random() | 0];
    this._loadingDiv.appendChild(imgLoad);


    this._resizeLoadingUI();

    window.addEventListener("resize", this._resizeLoadingUI);
    this._loadingDiv.style.backgroundColor = this._loadingDivBackgroundColor;
    document.body.appendChild(this._loadingDiv);

    this._loadingDiv.style.opacity = "1";
};



BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function () {
    if (!this._loadingDiv) {
        return;
    }

    const onTransitionEnd = () => {
        if (this._loadingDiv) {
            if (this._loadingDiv.parentElement) {
                this._loadingDiv.parentElement.removeChild(this._loadingDiv);
            }
            this._loadingDiv = null;
        }
        if (this._style) {
            if (this._style.parentElement) {
                this._style.parentElement.removeChild(this._style);
            }
            this._style = null;
        }
        window.removeEventListener("resize", this._resizeLoadingUI);
    };

    this._loadingDiv.style.opacity = "0";
    this._loadingDiv.addEventListener("transitionend", onTransitionEnd);
}