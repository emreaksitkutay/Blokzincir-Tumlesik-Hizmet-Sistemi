use anchor_lang::prelude::*;
declare_id!("8J68PmD6H3GWs1toG2Ea5GyGMCQB9X5HEGy3LzPgMpEa");

#[program]
pub mod my_program {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let my_program = &mut ctx.accounts.my_program;
        my_program.authority = *ctx.accounts.authority.key;
        Ok(())
    }

    pub fn transfer_nfts_to_dead_wallet(ctx: Context<TransferNFTsToDeadWallet>) -> Result<()> {
        Ok(())
    }

    pub fn send_new_nft_to_user(ctx: Context<SendNewNFTToUser>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut, signer)]
    pub authority: AccountInfo<'info>,
    #[account(init, payer = authority, space = 8 + 8)]
    pub my_program: Account<'info, MyProgram>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct TransferNFTsToDeadWallet<'info> {
    #[account(signer)]
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    pub user_wallet: AccountInfo<'info>,
    pub dead_wallet: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SendNewNFTToUser<'info> {
    #[account(signer)]
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    pub user_wallet: AccountInfo<'info>,
    pub mint_address: AccountInfo<'info>,
}

#[account]
pub struct MyProgram {
    pub authority: Pubkey,
}