const fns = { exit: [] };

global.process.exit = ((code: number) => true) as any;