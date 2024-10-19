use tauri_plugin_sql::{Migration, MigrationKind};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        // Define your migrations here
        Migration {
            version: 1,
            description: "create_project_table",
            sql: "CREATE TABLE `projects` (
                `projectId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                `name` text NOT NULL,
                `description` text,
                `is_template` integer DEFAULT 0 NOT NULL,
                `created_at` text DEFAULT (CURRENT_TIMESTAMP)
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create_rules_table",
            sql: "CREATE TABLE `rules` (
                `ruleId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                `projectId` integer NOT NULL,
                `name` text NOT NULL,
                `description` text,
                `jsonBody` text,
                `created_at` text DEFAULT (CURRENT_TIMESTAMP)
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "create_devices_table",
            sql: "CREATE TABLE `devices` (
                `deviceId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                `name` text NOT NULL,
                `type` text NOT NULL,
                `description` text,
                `configuation` text,
                `created_at` text DEFAULT (CURRENT_TIMESTAMP)
            );",
            kind: MigrationKind::Up,
        }
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::new().add_migrations("sqlite:tb_projects.db", migrations).build())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
