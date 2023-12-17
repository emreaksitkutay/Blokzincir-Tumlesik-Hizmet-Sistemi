use anchor_lang::prelude::*;
declare_id!("A5zbZUxgGGM4HhQiu6WkRejueTRUkwjyyBReNLRvQnnr");

#[program]
pub mod hello_world {
    use super::*;
    pub fn init_vote_bank(ctx: Context<InitVote>) -> Result<()> {
        ctx.accounts.vote_account.is_open_to_vote = true;
        Ok(())
    }
    pub fn gib_vote(ctx: Context<GibVote>, vote_type: u64) -> Result<()> {
        ctx.accounts.vote_account.is_open_to_vote;
        match vote_type {
            0 => {
                msg!("Destekliyorum olarak oylandı.");
                ctx.accounts.vote_account.yes += 1;
            }
            1 => {
                msg!("Desteklemiyorum olarak oylandı.");
                ctx.accounts.vote_account.no += 1;
            }
            _ => {
                msg!("Geçersiz oylama tipi");
            }
        }
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitVote<'info> {
    #[account(
        init, 
        payer = signer, 
        space = 8 + 1 + 8 + 8, 
    )]
    pub vote_account: Account<'info, VoteBank>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(Default)]
pub struct VoteBank {
    is_open_to_vote: bool,
    yes: u64,
    no: u64,
}

#[derive(Accounts)]
pub struct GibVote<'info> {
    #[account(mut)]
    pub vote_account: Account<'info, VoteBank>,
    pub signer: Signer<'info>,
}