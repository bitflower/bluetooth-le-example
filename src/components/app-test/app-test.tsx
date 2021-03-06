import { loadingController } from "@ionic/core";
import { Component, Host, h, State } from "@stencil/core";

import { handleError } from "../../helpers/error";
import { resultToString } from "../../helpers/helpers";
import { testBleClient, testInit } from "../../test/bleClient.test";
import { testBleScan } from "../../test/bleScan.test";
import { testFilters } from "../../test/filter.test";
import { testMultipleDevices } from "../../test/multipleDevices.test";
import { testRunner } from "../../test/runner.test";
import { printResult, beforeAll } from "../../test/testRunner";

@Component({
  tag: "app-test",
  styleUrl: "app-test.css",
})
export class AppTest {
  @State() result = "";

  private actions: { label: string; action: () => Promise<any> }[] = [
    {
      label: "test all",
      action: async () => {
        beforeAll();
        await testInit();
        await testBleClient();
        await testMultipleDevices();
        await testBleScan();
        await testFilters();
        const result = printResult();
        return result;
      },
    },
    {
      label: "test init",
      action: async () => {
        beforeAll();
        await testInit();
        const result = printResult();
        return result;
      },
    },
    {
      label: "test ble client",
      action: async () => {
        beforeAll();
        await testBleClient();
        const result = printResult();
        return result;
      },
    },
    {
      label: "test multiple dev",
      action: async () => {
        beforeAll();
        await testMultipleDevices();
        const result = printResult();
        return result;
      },
    },
    {
      label: "test scan",
      action: async () => {
        beforeAll();
        await testBleScan();
        const result = printResult();
        return result;
      },
    },
    {
      label: "test filters",
      action: async () => {
        beforeAll();
        await testFilters();
        const result = printResult();
        return result;
      },
    },
    {
      label: "(test runner)",
      action: async () => {
        beforeAll();
        await testRunner();
        const result = printResult();
        return result;
      },
    },
  ];

  private async runAction(action: () => Promise<any>): Promise<void> {
    const loading = await loadingController.create({});
    await loading.present();
    try {
      this.result = "";
      const result = await action();
      this.result = resultToString(result);
    } catch (error) {
      handleError(error);
    }
    loading.dismiss();
  }

  render(): any {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Test</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <div class="ion-margin result">{this.result}</div>
          {this.actions.map(action => (
            <ion-button onClick={() => this.runAction(action.action)}>
              {action.label}
            </ion-button>
          ))}
        </ion-content>
      </Host>
    );
  }
}
