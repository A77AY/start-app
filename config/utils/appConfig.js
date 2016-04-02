import path from 'path'

function getStructure(node, root, nodeDir = '') {
    const newNode = {};
    for (const key in node) {
        switch (typeof node[key]) {
            case 'string':
                newNode[key] = {
                    name: node[key],
                    dir: path.join(nodeDir, node[key]),
                    path: path.join(root, nodeDir, node[key])
                };
                break;
            case 'object':
                if (node[key].dir) {
                    const newNodeDir = path.join(nodeDir, node[key].dir);
                    const {dir, ...childNode} = node[key];
                    newNode[key] = {
                        name: node[key].dir,
                        dir: newNodeDir,
                        path: path.join(root, newNodeDir),
                        ...getStructure(childNode, root, newNodeDir)
                    }
                }
                break;
        }
    }
    return newNode;
}

const isServer = typeof document === 'undefined';

export default (config) => {
    const root = path.resolve(__dirname, '../..');
    return {
        isDevelopment: process.env.NODE_ENV === 'development',
        isProduction: process.env.NODE_ENV === 'production',
        root,
        isServer: isServer,
        isClient: !isServer,
        structure: getStructure(config.structure, root),
        server: {
            ...config.server,
            url: `http://${config.server.host}:${config.server.port}`
        }
    }
};