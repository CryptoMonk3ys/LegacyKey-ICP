export async function pagar() {

  /* try{
    openContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any, // which type of block the tx should be mined in

      contractAddress: 'ST2KMEEVZBBKN1AN856MB356GD3G3TTN8X8N0B05D',
      contractName: 'LegacyKeyV1',
      functionName: 'payLegacy',
      functionArgs: [],

      postConditionMode: PostConditionMode.Deny, // whether the tx should fail when unexpected assets are transferred
      postConditions: [], // for an example using post-conditions, see next example

      onFinish: response => {
        console.log('Se registró el pago correctamente');
      },
      onCancel: () => {
        console.log('Se canceló el pago');
      },
    });

  }catch (error: unknown) {
    if (error instanceof Error) {
      // Maneja los errores y los registra
      console.log('=> error:', error);

    }
    throw error;
  }  */

  return true;


}
