<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Client;

class ClientsEmailCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cmd:sendemail';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sending Emails to clients';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info("Sending emails started");
        $clients = Client::get();
        foreach($clients as $client) {
            \Log::channel('email')->info('Sending Email to client', [
                'id' => $client->id,
                'email' => $client->email
            ]);
        }
        $this->info("Sending emails ended");
        return 0;
    }
}
