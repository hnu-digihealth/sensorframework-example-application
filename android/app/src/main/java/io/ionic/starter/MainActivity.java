package io.ionic.starter;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

import com.bleclient.plugin.BluetoothLEClient;
import com.sensingkit.plugin.SensingKit;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    this.init(
            savedInstanceState,
            new ArrayList<Class<? extends Plugin>>()
            {{
              add(BluetoothLEClient.class);
              add(SensingKit.class);
            }}
            );
  }
}
