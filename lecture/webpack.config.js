// 노드에서 경로를 쉽게 조작하려고 주는 실행기
const path = require('path');

module.exports = {
    name: 'word-relay-setting',
    mode : 'development',
    devtool: 'eval',
    resolve: {
        // 웹팩이 알아서 아래 파일 확장자를 찾아줌
        extensions: ['.js', '.jsx']
    },
    // 입력
    entry: {
        // client가 이미 WordRelay를 불러오고 있음
        app: ['./client']
    },

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
            },
        }],
    },

    // 출력
    output: {
        // 현재 폴더 경로의 dist로 출력
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
    },
};