import muipkg from '@mui/material/package.json';
import styles from './table.module.css';
import Button from '@mui/material/Button';
import { init } from '@module-federation/runtime'

export type TableData = {
  name: string;
  age: number;
  email: string;
};

/* eslint-disable-next-line */
export interface TableProps {
  data: TableData[];
  envVar: string;
}

const getPlugin = (envVar: string) => {
  return { 
    name: 'runtime-module-plugin', 
    beforeRequest(args: any) {
      // Here you can optimize to replace only the one you want by the args.id
      // It has the exact import you want.
    
      // For this example it runs through all of the remotes in search of a match to replace
      args.options.remotes.forEach((remote: any) => {
        // Matches and replaces with whatever you want
        if (envVar && 'entry' in remote) {
          remote.entry = remote.entry.replace(
            'https://[environment]',
            envVar,
          );
        }
      });
    
      return args;
    }
  }
}

// @ts-ignore
const Remote2 = React.lazy(() => import("remote2/table"))

export function Table({ data, envVar }: TableProps) {

  init({
    name: 'host',
    remotes: [],
    plugins: [getPlugin(envVar)]
  });

  return (
    <>
      <div className="flex justify-center">
        <Button variant="outlined" color="error">
          Buttom from MUI
        </Button>
      </div>
      <h3 className="text-center font-bold mt-4">
        This is the <span className="text-yellow-700">@mui/material</span>{' '}
        version being called from remote:{' '}
        <span className={styles.redText}>[{muipkg.version}]</span>
      </h3>
      <table className={`${styles.table} mt-6`}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Name</th>
            <th className={styles.tableHeader}>Age</th>
            <th className={styles.tableHeader}>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr className={styles.tableRow} key={row.email}>
              <td className={styles.tableCell}>{row.name}</td>
              <td className={styles.tableCell}>{row.age}</td>
              <td className={styles.tableCell}>{row.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Remote2 />
    </>
  );
}

export default Table;
