const JsConfuser = require('js-confuser');

let userNameForObfuscation = '';

const setUserName = (name) => {
  userNameForObfuscation = name;
};
const startDate = new Date();
const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Tambah 7 hari dalam milidetik

async function appolofree(sourceCode) {
  console.log("@tearsinsilencee Result:\n", sourceCode);

  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 7);

  try {
    const obfuscatedCode = await JsConfuser.obfuscate(sourceCode, {
      target: 'node',
      calculator: true,
      globalConcealing: true,
      movedDeclarations: true,
      objectExtraction: true,
      renameVariables: true,
      renameGlobals: true,
      shuffle: true,
      variableMasking: 0.5,
      stringConcealing: true,
      stringSplitting: 0.25,
      flatten: true,
      opaquePredicates: false,
      astScrambler: true,
      renameLabels: true,
      preserveFunctionLength: true,
      stringCompression: true,
      compact: true,
      lock: {
        antiDebug: false,
          startDate: startDate.getTime(), // Timestamp (number)
         endDate: endDate.getTime(),     // Timestamp (number) +7 hari
       },
      identifierGenerator: function () {
        const randomValue = Math.floor(Math.random() * 9000) + 1000;
        const repeatedChar = "气".repeat(1);
        return userNameForObfuscation + repeatedChar + randomValue;
      },
    });

    console.log("@tearsinsilencee Result Enc:\n", obfuscatedCode);
    return obfuscatedCode;
  } catch (error) {
    console.error('Terjadi kesalahan saat obfuscation dengan jsconfuser:', error);
    throw error;
  }
}

module.exports = { appolofree, setUserName };
