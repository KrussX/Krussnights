class LVLAbstract {
    constructor(gameconfig) {

        gameconfig.createNewEngine()
        this.scene = new BABYLON.Scene(gameconfig.engine);
        gameconfig.scenes.push(this.scene)
       
        this.gameconfig = gameconfig;
        this.gui;
        this.light;
        this.frame = 300
        this.render = false;
        this.depart = false;

    }

    loadSounds() {
        throw new Error('You must implement this function');

    }

    loadSkybox(url) {
        var instance = this;
        var assetsManager = instance.scene.assetsManager;

        var textureTask = assetsManager.addTextureTask("image task", url);
        textureTask.onSuccess = function (task) {
            instance.scene.assets.skybox = task.texture
        }
    }



    playBGM(volume) {
        throw new Error('You must implement this function');
    }

    playSound(soundname, volume) {
        var sound = this.scene.assets[soundname]
        sound.setVolume(volume)
        sound.play()
    }

    configureAssetManager() {
        // useful for storing references to assets as properties. i.ethis.scene.assets.cannonsound, etc.
        this.scene.assets = {};
        var instance = this;

        let assetsManager = new BABYLON.AssetsManager(this.scene);

        assetsManager.onProgress = function (
            remainingCount,
            totalCount
        ) {
            instance.gameconfig.engine.loadingUIText =
                '<div id="center"><div id="main" style="width:' + ((totalCount - remainingCount) * 600 / totalCount) + 'px"></div></div>'
        };
        instance.createScene()
        assetsManager.onFinish = function (tasks) {
            instance.gameconfig.engine.runRenderLoop(function () {
                instance.renderScene();
            });
        };

        this.scene.assetsManager = assetsManager;
    }


    createLights() {
        // i.e sun light with all light rays parallels, the vector is the direction.
        let light0 = new BABYLON.HemisphericLight("dir0", new BABYLON.Vector3(1, 0, -10), this.scene);
        light0.intensity = 0;
        this.light = light0
    }

    renderScene() {
        throw new Error('You must implement this function');
        
    }

    loadAssets() {
        throw new Error('You must implement this function');
    }

    createScene() {
        throw new Error('You must implement this function');
    }

}