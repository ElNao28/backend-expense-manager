const { execSync } = require('child_process');

const migrationName = process.argv[2];

if (!migrationName)
  throw new Error(
    'Write migration name. Example - npm run migration:create myMigration',
  );

const command = `npx typeorm-ts-node-commonjs migration:create ./migrations/${migrationName}`;

execSync(command, { stdio: 'inherit' });
