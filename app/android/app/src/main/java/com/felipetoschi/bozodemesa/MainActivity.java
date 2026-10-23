package com.felipetoschi.bozodemesa;

import android.os.Bundle;
import android.view.WindowManager;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Plugin próprio para mandar o resultado (imagem ou texto) direto para o WhatsApp
        registerPlugin(CompartilharPlugin.class);
        super.onCreate(savedInstanceState);
        // Jogo de mesa: a tela não apaga enquanto o app está aberto
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    }
}
